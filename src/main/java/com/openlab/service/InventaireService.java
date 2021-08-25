package com.openlab.service;

import com.openlab.service.dto.InventaireDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.openlab.domain.Inventaire}.
 */
public interface InventaireService {
    /**
     * Save a inventaire.
     *
     * @param inventaireDTO the entity to save.
     * @return the persisted entity.
     */
    InventaireDTO save(InventaireDTO inventaireDTO);

    /**
     * Partially updates a inventaire.
     *
     * @param inventaireDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InventaireDTO> partialUpdate(InventaireDTO inventaireDTO);

    /**
     * Get all the inventaires.
     *
     * @return the list of entities.
     */
    List<InventaireDTO> findAll();

    /**
     * Get the "id" inventaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InventaireDTO> findOne(Long id);

    /**
     * Delete the "id" inventaire.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
