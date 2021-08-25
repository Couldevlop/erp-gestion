package com.openlab.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.openlab.domain.Famille} entity.
 */
public class FamilleDTO implements Serializable {

    private Long id;

    private Long idFamille;

    private String nomFamille;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdFamille() {
        return idFamille;
    }

    public void setIdFamille(Long idFamille) {
        this.idFamille = idFamille;
    }

    public String getNomFamille() {
        return nomFamille;
    }

    public void setNomFamille(String nomFamille) {
        this.nomFamille = nomFamille;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FamilleDTO)) {
            return false;
        }

        FamilleDTO familleDTO = (FamilleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, familleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FamilleDTO{" +
            "id=" + getId() +
            ", idFamille=" + getIdFamille() +
            ", nomFamille='" + getNomFamille() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
