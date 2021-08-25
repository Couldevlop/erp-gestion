package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Famille.
 */
@Entity
@Table(name = "famille")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Famille implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_famille")
    private Long idFamille;

    @Column(name = "nom_famille")
    private String nomFamille;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "famille")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "famille" }, allowSetters = true)
    private Set<SousFamille> familleDeSousFamilles = new HashSet<>();

    @JsonIgnoreProperties(value = { "famille", "categories", "inventaire", "fournisseur", "commande" }, allowSetters = true)
    @OneToOne(mappedBy = "famille")
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Famille id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdFamille() {
        return this.idFamille;
    }

    public Famille idFamille(Long idFamille) {
        this.idFamille = idFamille;
        return this;
    }

    public void setIdFamille(Long idFamille) {
        this.idFamille = idFamille;
    }

    public String getNomFamille() {
        return this.nomFamille;
    }

    public Famille nomFamille(String nomFamille) {
        this.nomFamille = nomFamille;
        return this;
    }

    public void setNomFamille(String nomFamille) {
        this.nomFamille = nomFamille;
    }

    public String getDescription() {
        return this.description;
    }

    public Famille description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<SousFamille> getFamilleDeSousFamilles() {
        return this.familleDeSousFamilles;
    }

    public Famille familleDeSousFamilles(Set<SousFamille> sousFamilles) {
        this.setFamilleDeSousFamilles(sousFamilles);
        return this;
    }

    public Famille addFamilleDeSousFamille(SousFamille sousFamille) {
        this.familleDeSousFamilles.add(sousFamille);
        sousFamille.setFamille(this);
        return this;
    }

    public Famille removeFamilleDeSousFamille(SousFamille sousFamille) {
        this.familleDeSousFamilles.remove(sousFamille);
        sousFamille.setFamille(null);
        return this;
    }

    public void setFamilleDeSousFamilles(Set<SousFamille> sousFamilles) {
        if (this.familleDeSousFamilles != null) {
            this.familleDeSousFamilles.forEach(i -> i.setFamille(null));
        }
        if (sousFamilles != null) {
            sousFamilles.forEach(i -> i.setFamille(this));
        }
        this.familleDeSousFamilles = sousFamilles;
    }

    public Article getArticle() {
        return this.article;
    }

    public Famille article(Article article) {
        this.setArticle(article);
        return this;
    }

    public void setArticle(Article article) {
        if (this.article != null) {
            this.article.setFamille(null);
        }
        if (article != null) {
            article.setFamille(this);
        }
        this.article = article;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Famille)) {
            return false;
        }
        return id != null && id.equals(((Famille) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Famille{" +
            "id=" + getId() +
            ", idFamille=" + getIdFamille() +
            ", nomFamille='" + getNomFamille() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
