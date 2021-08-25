package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Fournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_fournisseur")
    private Long idFournisseur;

    @Column(name = "nom_fournisseur")
    private String nomFournisseur;

    @Column(name = "raison_sociale")
    private String raisonSociale;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "adresse")
    private String adresse;

    @OneToMany(mappedBy = "fournisseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "famille", "categories", "inventaire", "fournisseur", "commande" }, allowSetters = true)
    private Set<Article> fourArticles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Fournisseur id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdFournisseur() {
        return this.idFournisseur;
    }

    public Fournisseur idFournisseur(Long idFournisseur) {
        this.idFournisseur = idFournisseur;
        return this;
    }

    public void setIdFournisseur(Long idFournisseur) {
        this.idFournisseur = idFournisseur;
    }

    public String getNomFournisseur() {
        return this.nomFournisseur;
    }

    public Fournisseur nomFournisseur(String nomFournisseur) {
        this.nomFournisseur = nomFournisseur;
        return this;
    }

    public void setNomFournisseur(String nomFournisseur) {
        this.nomFournisseur = nomFournisseur;
    }

    public String getRaisonSociale() {
        return this.raisonSociale;
    }

    public Fournisseur raisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Fournisseur telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Fournisseur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Set<Article> getFourArticles() {
        return this.fourArticles;
    }

    public Fournisseur fourArticles(Set<Article> articles) {
        this.setFourArticles(articles);
        return this;
    }

    public Fournisseur addFourArticle(Article article) {
        this.fourArticles.add(article);
        article.setFournisseur(this);
        return this;
    }

    public Fournisseur removeFourArticle(Article article) {
        this.fourArticles.remove(article);
        article.setFournisseur(null);
        return this;
    }

    public void setFourArticles(Set<Article> articles) {
        if (this.fourArticles != null) {
            this.fourArticles.forEach(i -> i.setFournisseur(null));
        }
        if (articles != null) {
            articles.forEach(i -> i.setFournisseur(this));
        }
        this.fourArticles = articles;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fournisseur)) {
            return false;
        }
        return id != null && id.equals(((Fournisseur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fournisseur{" +
            "id=" + getId() +
            ", idFournisseur=" + getIdFournisseur() +
            ", nomFournisseur='" + getNomFournisseur() + "'" +
            ", raisonSociale='" + getRaisonSociale() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
