package com.openlab.service.impl;

import com.openlab.domain.SousFamille;
import com.openlab.repository.SousFamilleRepository;
import com.openlab.service.SousFamilleService;
import com.openlab.service.dto.SousFamilleDTO;
import com.openlab.service.mapper.SousFamilleMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SousFamille}.
 */
@Service
@Transactional
public class SousFamilleServiceImpl implements SousFamilleService {

    private final Logger log = LoggerFactory.getLogger(SousFamilleServiceImpl.class);

    private final SousFamilleRepository sousFamilleRepository;

    private final SousFamilleMapper sousFamilleMapper;

    public SousFamilleServiceImpl(SousFamilleRepository sousFamilleRepository, SousFamilleMapper sousFamilleMapper) {
        this.sousFamilleRepository = sousFamilleRepository;
        this.sousFamilleMapper = sousFamilleMapper;
    }

    @Override
    public SousFamilleDTO save(SousFamilleDTO sousFamilleDTO) {
        log.debug("Request to save SousFamille : {}", sousFamilleDTO);
        SousFamille sousFamille = sousFamilleMapper.toEntity(sousFamilleDTO);
        sousFamille = sousFamilleRepository.save(sousFamille);
        return sousFamilleMapper.toDto(sousFamille);
    }

    @Override
    public Optional<SousFamilleDTO> partialUpdate(SousFamilleDTO sousFamilleDTO) {
        log.debug("Request to partially update SousFamille : {}", sousFamilleDTO);

        return sousFamilleRepository
            .findById(sousFamilleDTO.getId())
            .map(
                existingSousFamille -> {
                    sousFamilleMapper.partialUpdate(existingSousFamille, sousFamilleDTO);

                    return existingSousFamille;
                }
            )
            .map(sousFamilleRepository::save)
            .map(sousFamilleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SousFamilleDTO> findAll() {
        log.debug("Request to get all SousFamilles");
        return sousFamilleRepository.findAll().stream().map(sousFamilleMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SousFamilleDTO> findOne(Long id) {
        log.debug("Request to get SousFamille : {}", id);
        return sousFamilleRepository.findById(id).map(sousFamilleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SousFamille : {}", id);
        sousFamilleRepository.deleteById(id);
    }
}
