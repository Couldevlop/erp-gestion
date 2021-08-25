package com.openlab.web.rest;

import com.openlab.repository.SousFamilleRepository;
import com.openlab.service.SousFamilleService;
import com.openlab.service.dto.SousFamilleDTO;
import com.openlab.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.openlab.domain.SousFamille}.
 */
@RestController
@RequestMapping("/api")
public class SousFamilleResource {

    private final Logger log = LoggerFactory.getLogger(SousFamilleResource.class);

    private static final String ENTITY_NAME = "sousFamille";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SousFamilleService sousFamilleService;

    private final SousFamilleRepository sousFamilleRepository;

    public SousFamilleResource(SousFamilleService sousFamilleService, SousFamilleRepository sousFamilleRepository) {
        this.sousFamilleService = sousFamilleService;
        this.sousFamilleRepository = sousFamilleRepository;
    }

    /**
     * {@code POST  /sous-familles} : Create a new sousFamille.
     *
     * @param sousFamilleDTO the sousFamilleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sousFamilleDTO, or with status {@code 400 (Bad Request)} if the sousFamille has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sous-familles")
    public ResponseEntity<SousFamilleDTO> createSousFamille(@RequestBody SousFamilleDTO sousFamilleDTO) throws URISyntaxException {
        log.debug("REST request to save SousFamille : {}", sousFamilleDTO);
        if (sousFamilleDTO.getId() != null) {
            throw new BadRequestAlertException("A new sousFamille cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SousFamilleDTO result = sousFamilleService.save(sousFamilleDTO);
        return ResponseEntity
            .created(new URI("/api/sous-familles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sous-familles/:id} : Updates an existing sousFamille.
     *
     * @param id the id of the sousFamilleDTO to save.
     * @param sousFamilleDTO the sousFamilleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sousFamilleDTO,
     * or with status {@code 400 (Bad Request)} if the sousFamilleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sousFamilleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sous-familles/{id}")
    public ResponseEntity<SousFamilleDTO> updateSousFamille(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SousFamilleDTO sousFamilleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update SousFamille : {}, {}", id, sousFamilleDTO);
        if (sousFamilleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sousFamilleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sousFamilleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SousFamilleDTO result = sousFamilleService.save(sousFamilleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sousFamilleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sous-familles/:id} : Partial updates given fields of an existing sousFamille, field will ignore if it is null
     *
     * @param id the id of the sousFamilleDTO to save.
     * @param sousFamilleDTO the sousFamilleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sousFamilleDTO,
     * or with status {@code 400 (Bad Request)} if the sousFamilleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the sousFamilleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the sousFamilleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sous-familles/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<SousFamilleDTO> partialUpdateSousFamille(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SousFamilleDTO sousFamilleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update SousFamille partially : {}, {}", id, sousFamilleDTO);
        if (sousFamilleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sousFamilleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sousFamilleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SousFamilleDTO> result = sousFamilleService.partialUpdate(sousFamilleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sousFamilleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /sous-familles} : get all the sousFamilles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sousFamilles in body.
     */
    @GetMapping("/sous-familles")
    public List<SousFamilleDTO> getAllSousFamilles() {
        log.debug("REST request to get all SousFamilles");
        return sousFamilleService.findAll();
    }

    /**
     * {@code GET  /sous-familles/:id} : get the "id" sousFamille.
     *
     * @param id the id of the sousFamilleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sousFamilleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sous-familles/{id}")
    public ResponseEntity<SousFamilleDTO> getSousFamille(@PathVariable Long id) {
        log.debug("REST request to get SousFamille : {}", id);
        Optional<SousFamilleDTO> sousFamilleDTO = sousFamilleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sousFamilleDTO);
    }

    /**
     * {@code DELETE  /sous-familles/:id} : delete the "id" sousFamille.
     *
     * @param id the id of the sousFamilleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sous-familles/{id}")
    public ResponseEntity<Void> deleteSousFamille(@PathVariable Long id) {
        log.debug("REST request to delete SousFamille : {}", id);
        sousFamilleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
