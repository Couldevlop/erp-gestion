package com.openlab.service.impl;

import com.openlab.domain.Famille;
import com.openlab.repository.FamilleRepository;
import com.openlab.service.FamilleService;
import com.openlab.service.dto.FamilleDTO;
import com.openlab.service.mapper.FamilleMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Famille}.
 */
@Service
@Transactional
public class FamilleServiceImpl implements FamilleService {

    private final Logger log = LoggerFactory.getLogger(FamilleServiceImpl.class);

    private final FamilleRepository familleRepository;

    private final FamilleMapper familleMapper;

    public FamilleServiceImpl(FamilleRepository familleRepository, FamilleMapper familleMapper) {
        this.familleRepository = familleRepository;
        this.familleMapper = familleMapper;
    }

    @Override
    public FamilleDTO save(FamilleDTO familleDTO) {
        log.debug("Request to save Famille : {}", familleDTO);
        Famille famille = familleMapper.toEntity(familleDTO);
        famille = familleRepository.save(famille);
        return familleMapper.toDto(famille);
    }

    @Override
    public Optional<FamilleDTO> partialUpdate(FamilleDTO familleDTO) {
        log.debug("Request to partially update Famille : {}", familleDTO);

        return familleRepository
            .findById(familleDTO.getId())
            .map(
                existingFamille -> {
                    familleMapper.partialUpdate(existingFamille, familleDTO);

                    return existingFamille;
                }
            )
            .map(familleRepository::save)
            .map(familleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FamilleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Familles");
        return familleRepository.findAll(pageable).map(familleMapper::toDto);
    }

    /**
     *  Get all the familles where Article is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FamilleDTO> findAllWhereArticleIsNull() {
        log.debug("Request to get all familles where Article is null");
        return StreamSupport
            .stream(familleRepository.findAll().spliterator(), false)
            .filter(famille -> famille.getArticle() == null)
            .map(familleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FamilleDTO> findOne(Long id) {
        log.debug("Request to get Famille : {}", id);
        return familleRepository.findById(id).map(familleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Famille : {}", id);
        familleRepository.deleteById(id);
    }
}
