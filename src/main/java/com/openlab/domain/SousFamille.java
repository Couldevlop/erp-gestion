package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * not an ignored comment
 */
@Entity
@Table(name = "sous_famille")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SousFamille implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_sous_famille")
    private Long idSousFamille;

    @Column(name = "nom_sous_famille")
    private String nomSousFamille;

    @Column(name = "description")
    private String description;

    @Column(name = "state_province")
    private String stateProvince;

    @ManyToOne
    @JsonIgnoreProperties(value = { "familleDeSousFamilles", "article" }, allowSetters = true)
    private Famille famille;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SousFamille id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdSousFamille() {
        return this.idSousFamille;
    }

    public SousFamille idSousFamille(Long idSousFamille) {
        this.idSousFamille = idSousFamille;
        return this;
    }

    public void setIdSousFamille(Long idSousFamille) {
        this.idSousFamille = idSousFamille;
    }

    public String getNomSousFamille() {
        return this.nomSousFamille;
    }

    public SousFamille nomSousFamille(String nomSousFamille) {
        this.nomSousFamille = nomSousFamille;
        return this;
    }

    public void setNomSousFamille(String nomSousFamille) {
        this.nomSousFamille = nomSousFamille;
    }

    public String getDescription() {
        return this.description;
    }

    public SousFamille description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStateProvince() {
        return this.stateProvince;
    }

    public SousFamille stateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Famille getFamille() {
        return this.famille;
    }

    public SousFamille famille(Famille famille) {
        this.setFamille(famille);
        return this;
    }

    public void setFamille(Famille famille) {
        this.famille = famille;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SousFamille)) {
            return false;
        }
        return id != null && id.equals(((SousFamille) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SousFamille{" +
            "id=" + getId() +
            ", idSousFamille=" + getIdSousFamille() +
            ", nomSousFamille='" + getNomSousFamille() + "'" +
            ", description='" + getDescription() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            "}";
    }
}
