package com.openlab.service.dto;

import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.openlab.domain.SousFamille} entity.
 */
@ApiModel(description = "not an ignored comment")
public class SousFamilleDTO implements Serializable {

    private Long id;

    private Long idSousFamille;

    private String nomSousFamille;

    private String description;

    private String stateProvince;

    private FamilleDTO famille;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdSousFamille() {
        return idSousFamille;
    }

    public void setIdSousFamille(Long idSousFamille) {
        this.idSousFamille = idSousFamille;
    }

    public String getNomSousFamille() {
        return nomSousFamille;
    }

    public void setNomSousFamille(String nomSousFamille) {
        this.nomSousFamille = nomSousFamille;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public FamilleDTO getFamille() {
        return famille;
    }

    public void setFamille(FamilleDTO famille) {
        this.famille = famille;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SousFamilleDTO)) {
            return false;
        }

        SousFamilleDTO sousFamilleDTO = (SousFamilleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, sousFamilleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SousFamilleDTO{" +
            "id=" + getId() +
            ", idSousFamille=" + getIdSousFamille() +
            ", nomSousFamille='" + getNomSousFamille() + "'" +
            ", description='" + getDescription() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            ", famille=" + getFamille() +
            "}";
    }
}
