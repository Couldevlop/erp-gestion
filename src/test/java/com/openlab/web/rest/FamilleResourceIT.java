package com.openlab.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openlab.IntegrationTest;
import com.openlab.domain.Famille;
import com.openlab.repository.FamilleRepository;
import com.openlab.service.dto.FamilleDTO;
import com.openlab.service.mapper.FamilleMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FamilleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FamilleResourceIT {

    private static final Long DEFAULT_ID_FAMILLE = 1L;
    private static final Long UPDATED_ID_FAMILLE = 2L;

    private static final String DEFAULT_NOM_FAMILLE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_FAMILLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/familles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FamilleRepository familleRepository;

    @Autowired
    private FamilleMapper familleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFamilleMockMvc;

    private Famille famille;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Famille createEntity(EntityManager em) {
        Famille famille = new Famille().idFamille(DEFAULT_ID_FAMILLE).nomFamille(DEFAULT_NOM_FAMILLE).description(DEFAULT_DESCRIPTION);
        return famille;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Famille createUpdatedEntity(EntityManager em) {
        Famille famille = new Famille().idFamille(UPDATED_ID_FAMILLE).nomFamille(UPDATED_NOM_FAMILLE).description(UPDATED_DESCRIPTION);
        return famille;
    }

    @BeforeEach
    public void initTest() {
        famille = createEntity(em);
    }

    @Test
    @Transactional
    void createFamille() throws Exception {
        int databaseSizeBeforeCreate = familleRepository.findAll().size();
        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);
        restFamilleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(familleDTO)))
            .andExpect(status().isCreated());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeCreate + 1);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getIdFamille()).isEqualTo(DEFAULT_ID_FAMILLE);
        assertThat(testFamille.getNomFamille()).isEqualTo(DEFAULT_NOM_FAMILLE);
        assertThat(testFamille.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createFamilleWithExistingId() throws Exception {
        // Create the Famille with an existing ID
        famille.setId(1L);
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        int databaseSizeBeforeCreate = familleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFamilleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(familleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFamilles() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        // Get all the familleList
        restFamilleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(famille.getId().intValue())))
            .andExpect(jsonPath("$.[*].idFamille").value(hasItem(DEFAULT_ID_FAMILLE.intValue())))
            .andExpect(jsonPath("$.[*].nomFamille").value(hasItem(DEFAULT_NOM_FAMILLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        // Get the famille
        restFamilleMockMvc
            .perform(get(ENTITY_API_URL_ID, famille.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(famille.getId().intValue()))
            .andExpect(jsonPath("$.idFamille").value(DEFAULT_ID_FAMILLE.intValue()))
            .andExpect(jsonPath("$.nomFamille").value(DEFAULT_NOM_FAMILLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingFamille() throws Exception {
        // Get the famille
        restFamilleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeUpdate = familleRepository.findAll().size();

        // Update the famille
        Famille updatedFamille = familleRepository.findById(famille.getId()).get();
        // Disconnect from session so that the updates on updatedFamille are not directly saved in db
        em.detach(updatedFamille);
        updatedFamille.idFamille(UPDATED_ID_FAMILLE).nomFamille(UPDATED_NOM_FAMILLE).description(UPDATED_DESCRIPTION);
        FamilleDTO familleDTO = familleMapper.toDto(updatedFamille);

        restFamilleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, familleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isOk());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getIdFamille()).isEqualTo(UPDATED_ID_FAMILLE);
        assertThat(testFamille.getNomFamille()).isEqualTo(UPDATED_NOM_FAMILLE);
        assertThat(testFamille.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, familleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(familleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFamilleWithPatch() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeUpdate = familleRepository.findAll().size();

        // Update the famille using partial update
        Famille partialUpdatedFamille = new Famille();
        partialUpdatedFamille.setId(famille.getId());

        partialUpdatedFamille.nomFamille(UPDATED_NOM_FAMILLE).description(UPDATED_DESCRIPTION);

        restFamilleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFamille.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFamille))
            )
            .andExpect(status().isOk());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getIdFamille()).isEqualTo(DEFAULT_ID_FAMILLE);
        assertThat(testFamille.getNomFamille()).isEqualTo(UPDATED_NOM_FAMILLE);
        assertThat(testFamille.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateFamilleWithPatch() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeUpdate = familleRepository.findAll().size();

        // Update the famille using partial update
        Famille partialUpdatedFamille = new Famille();
        partialUpdatedFamille.setId(famille.getId());

        partialUpdatedFamille.idFamille(UPDATED_ID_FAMILLE).nomFamille(UPDATED_NOM_FAMILLE).description(UPDATED_DESCRIPTION);

        restFamilleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFamille.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFamille))
            )
            .andExpect(status().isOk());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getIdFamille()).isEqualTo(UPDATED_ID_FAMILLE);
        assertThat(testFamille.getNomFamille()).isEqualTo(UPDATED_NOM_FAMILLE);
        assertThat(testFamille.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, familleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();
        famille.setId(count.incrementAndGet());

        // Create the Famille
        FamilleDTO familleDTO = familleMapper.toDto(famille);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFamilleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(familleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeDelete = familleRepository.findAll().size();

        // Delete the famille
        restFamilleMockMvc
            .perform(delete(ENTITY_API_URL_ID, famille.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
