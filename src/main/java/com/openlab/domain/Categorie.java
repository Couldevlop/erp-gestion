package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Categorie.
 */
@Entity
@Table(name = "categorie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Categorie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_categorie")
    private Long idCategorie;

    @Column(name = "nom_categorie")
    private String nomCategorie;

    @ManyToOne
    @JsonIgnoreProperties(value = { "famille", "categories", "inventaire", "fournisseur", "commande" }, allowSetters = true)
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Categorie id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdCategorie() {
        return this.idCategorie;
    }

    public Categorie idCategorie(Long idCategorie) {
        this.idCategorie = idCategorie;
        return this;
    }

    public void setIdCategorie(Long idCategorie) {
        this.idCategorie = idCategorie;
    }

    public String getNomCategorie() {
        return this.nomCategorie;
    }

    public Categorie nomCategorie(String nomCategorie) {
        this.nomCategorie = nomCategorie;
        return this;
    }

    public void setNomCategorie(String nomCategorie) {
        this.nomCategorie = nomCategorie;
    }

    public Article getArticle() {
        return this.article;
    }

    public Categorie article(Article article) {
        this.setArticle(article);
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Categorie)) {
            return false;
        }
        return id != null && id.equals(((Categorie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Categorie{" +
            "id=" + getId() +
            ", idCategorie=" + getIdCategorie() +
            ", nomCategorie='" + getNomCategorie() + "'" +
            "}";
    }
}
