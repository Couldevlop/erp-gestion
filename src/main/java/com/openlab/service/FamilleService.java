package com.openlab.service;

import com.openlab.service.dto.FamilleDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.openlab.domain.Famille}.
 */
public interface FamilleService {
    /**
     * Save a famille.
     *
     * @param familleDTO the entity to save.
     * @return the persisted entity.
     */
    FamilleDTO save(FamilleDTO familleDTO);

    /**
     * Partially updates a famille.
     *
     * @param familleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FamilleDTO> partialUpdate(FamilleDTO familleDTO);

    /**
     * Get all the familles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FamilleDTO> findAll(Pageable pageable);
    /**
     * Get all the FamilleDTO where Article is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<FamilleDTO> findAllWhereArticleIsNull();

    /**
     * Get the "id" famille.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FamilleDTO> findOne(Long id);

    /**
     * Delete the "id" famille.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
