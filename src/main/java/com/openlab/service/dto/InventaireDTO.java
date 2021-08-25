package com.openlab.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.openlab.domain.Inventaire} entity.
 */
public class InventaireDTO implements Serializable {

    private Long id;

    private Long idInventaire;

    private Instant dateInv;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdInventaire() {
        return idInventaire;
    }

    public void setIdInventaire(Long idInventaire) {
        this.idInventaire = idInventaire;
    }

    public Instant getDateInv() {
        return dateInv;
    }

    public void setDateInv(Instant dateInv) {
        this.dateInv = dateInv;
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
        if (!(o instanceof InventaireDTO)) {
            return false;
        }

        InventaireDTO inventaireDTO = (InventaireDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, inventaireDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InventaireDTO{" +
            "id=" + getId() +
            ", idInventaire=" + getIdInventaire() +
            ", dateInv='" + getDateInv() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
