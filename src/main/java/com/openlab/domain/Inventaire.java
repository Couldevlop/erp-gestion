package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Inventaire.
 */
@Entity
@Table(name = "inventaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Inventaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_inventaire")
    private Long idInventaire;

    @Column(name = "date_inv")
    private Instant dateInv;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "inventaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "famille", "categories", "inventaire", "fournisseur", "commande" }, allowSetters = true)
    private Set<Article> artInventes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Inventaire id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdInventaire() {
        return this.idInventaire;
    }

    public Inventaire idInventaire(Long idInventaire) {
        this.idInventaire = idInventaire;
        return this;
    }

    public void setIdInventaire(Long idInventaire) {
        this.idInventaire = idInventaire;
    }

    public Instant getDateInv() {
        return this.dateInv;
    }

    public Inventaire dateInv(Instant dateInv) {
        this.dateInv = dateInv;
        return this;
    }

    public void setDateInv(Instant dateInv) {
        this.dateInv = dateInv;
    }

    public String getDescription() {
        return this.description;
    }

    public Inventaire description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Article> getArtInventes() {
        return this.artInventes;
    }

    public Inventaire artInventes(Set<Article> articles) {
        this.setArtInventes(articles);
        return this;
    }

    public Inventaire addArtInvente(Article article) {
        this.artInventes.add(article);
        article.setInventaire(this);
        return this;
    }

    public Inventaire removeArtInvente(Article article) {
        this.artInventes.remove(article);
        article.setInventaire(null);
        return this;
    }

    public void setArtInventes(Set<Article> articles) {
        if (this.artInventes != null) {
            this.artInventes.forEach(i -> i.setInventaire(null));
        }
        if (articles != null) {
            articles.forEach(i -> i.setInventaire(this));
        }
        this.artInventes = articles;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inventaire)) {
            return false;
        }
        return id != null && id.equals(((Inventaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Inventaire{" +
            "id=" + getId() +
            ", idInventaire=" + getIdInventaire() +
            ", dateInv='" + getDateInv() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
