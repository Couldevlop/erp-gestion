package com.openlab.service.impl;

import com.openlab.domain.Inventaire;
import com.openlab.repository.InventaireRepository;
import com.openlab.service.InventaireService;
import com.openlab.service.dto.InventaireDTO;
import com.openlab.service.mapper.InventaireMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Inventaire}.
 */
@Service
@Transactional
public class InventaireServiceImpl implements InventaireService {

    private final Logger log = LoggerFactory.getLogger(InventaireServiceImpl.class);

    private final InventaireRepository inventaireRepository;

    private final InventaireMapper inventaireMapper;

    public InventaireServiceImpl(InventaireRepository inventaireRepository, InventaireMapper inventaireMapper) {
        this.inventaireRepository = inventaireRepository;
        this.inventaireMapper = inventaireMapper;
    }

    @Override
    public InventaireDTO save(InventaireDTO inventaireDTO) {
        log.debug("Request to save Inventaire : {}", inventaireDTO);
        Inventaire inventaire = inventaireMapper.toEntity(inventaireDTO);
        inventaire = inventaireRepository.save(inventaire);
        return inventaireMapper.toDto(inventaire);
    }

    @Override
    public Optional<InventaireDTO> partialUpdate(InventaireDTO inventaireDTO) {
        log.debug("Request to partially update Inventaire : {}", inventaireDTO);

        return inventaireRepository
            .findById(inventaireDTO.getId())
            .map(
                existingInventaire -> {
                    inventaireMapper.partialUpdate(existingInventaire, inventaireDTO);

                    return existingInventaire;
                }
            )
            .map(inventaireRepository::save)
            .map(inventaireMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventaireDTO> findAll() {
        log.debug("Request to get all Inventaires");
        return inventaireRepository.findAll().stream().map(inventaireMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InventaireDTO> findOne(Long id) {
        log.debug("Request to get Inventaire : {}", id);
        return inventaireRepository.findById(id).map(inventaireMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inventaire : {}", id);
        inventaireRepository.deleteById(id);
    }
}
