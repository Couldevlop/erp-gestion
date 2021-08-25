package com.openlab.service;

import com.openlab.service.dto.SousFamilleDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openlab.domain.SousFamille}.
 */
public interface SousFamilleService {
    /**
     * Save a sousFamille.
     *
     * @param sousFamilleDTO the entity to save.
     * @return the persisted entity.
     */
    SousFamilleDTO save(SousFamilleDTO sousFamilleDTO);

    /**
     * Partially updates a sousFamille.
     *
     * @param sousFamilleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SousFamilleDTO> partialUpdate(SousFamilleDTO sousFamilleDTO);

    /**
     * Get all the sousFamilles.
     *
     * @return the list of entities.
     */
    List<SousFamilleDTO> findAll();

    /**
     * Get the "id" sousFamille.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SousFamilleDTO> findOne(Long id);

    /**
     * Delete the "id" sousFamille.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
