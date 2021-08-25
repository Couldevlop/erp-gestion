package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_article")
    private Long idArticle;

    @Column(name = "nom_article")
    private String nomArticle;

    @Column(name = "rayon")
    private String rayon;

    @Column(name = "rayonnier")
    private String rayonnier;

    @Column(name = "description")
    private String description;

    @Column(name = "quantite")
    private Double quantite;

    @Column(name = "pu")
    private Double pu;

    @JsonIgnoreProperties(value = { "familleDeSousFamilles", "article" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Famille famille;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "article" }, allowSetters = true)
    private Set<Categorie> categories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "artInventes" }, allowSetters = true)
    private Inventaire inventaire;

    @ManyToOne
    @JsonIgnoreProperties(value = { "fourArticles" }, allowSetters = true)
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandeArticles" }, allowSetters = true)
    private Commande commande;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Article id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdArticle() {
        return this.idArticle;
    }

    public Article idArticle(Long idArticle) {
        this.idArticle = idArticle;
        return this;
    }

    public void setIdArticle(Long idArticle) {
        this.idArticle = idArticle;
    }

    public String getNomArticle() {
        return this.nomArticle;
    }

    public Article nomArticle(String nomArticle) {
        this.nomArticle = nomArticle;
        return this;
    }

    public void setNomArticle(String nomArticle) {
        this.nomArticle = nomArticle;
    }

    public String getRayon() {
        return this.rayon;
    }

    public Article rayon(String rayon) {
        this.rayon = rayon;
        return this;
    }

    public void setRayon(String rayon) {
        this.rayon = rayon;
    }

    public String getRayonnier() {
        return this.rayonnier;
    }

    public Article rayonnier(String rayonnier) {
        this.rayonnier = rayonnier;
        return this;
    }

    public void setRayonnier(String rayonnier) {
        this.rayonnier = rayonnier;
    }

    public String getDescription() {
        return this.description;
    }

    public Article description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQuantite() {
        return this.quantite;
    }

    public Article quantite(Double quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getPu() {
        return this.pu;
    }

    public Article pu(Double pu) {
        this.pu = pu;
        return this;
    }

    public void setPu(Double pu) {
        this.pu = pu;
    }

    public Famille getFamille() {
        return this.famille;
    }

    public Article famille(Famille famille) {
        this.setFamille(famille);
        return this;
    }

    public void setFamille(Famille famille) {
        this.famille = famille;
    }

    public Set<Categorie> getCategories() {
        return this.categories;
    }

    public Article categories(Set<Categorie> categories) {
        this.setCategories(categories);
        return this;
    }

    public Article addCategorie(Categorie categorie) {
        this.categories.add(categorie);
        categorie.setArticle(this);
        return this;
    }

    public Article removeCategorie(Categorie categorie) {
        this.categories.remove(categorie);
        categorie.setArticle(null);
        return this;
    }

    public void setCategories(Set<Categorie> categories) {
        if (this.categories != null) {
            this.categories.forEach(i -> i.setArticle(null));
        }
        if (categories != null) {
            categories.forEach(i -> i.setArticle(this));
        }
        this.categories = categories;
    }

    public Inventaire getInventaire() {
        return this.inventaire;
    }

    public Article inventaire(Inventaire inventaire) {
        this.setInventaire(inventaire);
        return this;
    }

    public void setInventaire(Inventaire inventaire) {
        this.inventaire = inventaire;
    }

    public Fournisseur getFournisseur() {
        return this.fournisseur;
    }

    public Article fournisseur(Fournisseur fournisseur) {
        this.setFournisseur(fournisseur);
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Commande getCommande() {
        return this.commande;
    }

    public Article commande(Commande commande) {
        this.setCommande(commande);
        return this;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", idArticle=" + getIdArticle() +
            ", nomArticle='" + getNomArticle() + "'" +
            ", rayon='" + getRayon() + "'" +
            ", rayonnier='" + getRayonnier() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantite=" + getQuantite() +
            ", pu=" + getPu() +
            "}";
    }
}
