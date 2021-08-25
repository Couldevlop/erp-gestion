package com.openlab.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.openlab.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SousFamilleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SousFamilleDTO.class);
        SousFamilleDTO sousFamilleDTO1 = new SousFamilleDTO();
        sousFamilleDTO1.setId(1L);
        SousFamilleDTO sousFamilleDTO2 = new SousFamilleDTO();
        assertThat(sousFamilleDTO1).isNotEqualTo(sousFamilleDTO2);
        sousFamilleDTO2.setId(sousFamilleDTO1.getId());
        assertThat(sousFamilleDTO1).isEqualTo(sousFamilleDTO2);
        sousFamilleDTO2.setId(2L);
        assertThat(sousFamilleDTO1).isNotEqualTo(sousFamilleDTO2);
        sousFamilleDTO1.setId(null);
        assertThat(sousFamilleDTO1).isNotEqualTo(sousFamilleDTO2);
    }
}
