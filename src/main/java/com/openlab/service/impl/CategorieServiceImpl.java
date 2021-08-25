package com.openlab.service.impl;

import com.openlab.domain.Categorie;
import com.openlab.repository.CategorieRepository;
import com.openlab.service.CategorieService;
import com.openlab.service.dto.CategorieDTO;
import com.openlab.service.mapper.CategorieMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Categorie}.
 */
@Service
@Transactional
public class CategorieServiceImpl implements CategorieService {

    private final Logger log = LoggerFactory.getLogger(CategorieServiceImpl.class);

    private final CategorieRepository categorieRepository;

    private final CategorieMapper categorieMapper;

    public CategorieServiceImpl(CategorieRepository categorieRepository, CategorieMapper categorieMapper) {
        this.categorieRepository = categorieRepository;
        this.categorieMapper = categorieMapper;
    }

    @Override
    public CategorieDTO save(CategorieDTO categorieDTO) {
        log.debug("Request to save Categorie : {}", categorieDTO);
        Categorie categorie = categorieMapper.toEntity(categorieDTO);
        categorie = categorieRepository.save(categorie);
        return categorieMapper.toDto(categorie);
    }

    @Override
    public Optional<CategorieDTO> partialUpdate(CategorieDTO categorieDTO) {
        log.debug("Request to partially update Categorie : {}", categorieDTO);

        return categorieRepository
            .findById(categorieDTO.getId())
            .map(
                existingCategorie -> {
                    categorieMapper.partialUpdate(existingCategorie, categorieDTO);

                    return existingCategorie;
                }
            )
            .map(categorieRepository::save)
            .map(categorieMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategorieDTO> findAll() {
        log.debug("Request to get all Categories");
        return categorieRepository.findAll().stream().map(categorieMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CategorieDTO> findOne(Long id) {
        log.debug("Request to get Categorie : {}", id);
        return categorieRepository.findById(id).map(categorieMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Categorie : {}", id);
        categorieRepository.deleteById(id);
    }
}
