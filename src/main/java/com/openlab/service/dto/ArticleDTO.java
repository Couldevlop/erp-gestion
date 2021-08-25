package com.openlab.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.openlab.domain.Article} entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    private Long idArticle;

    private String nomArticle;

    private String rayon;

    private String rayonnier;

    private String description;

    private Double quantite;

    private Double pu;

    private FamilleDTO famille;

    private InventaireDTO inventaire;

    private FournisseurDTO fournisseur;

    private CommandeDTO commande;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdArticle() {
        return idArticle;
    }

    public void setIdArticle(Long idArticle) {
        this.idArticle = idArticle;
    }

    public String getNomArticle() {
        return nomArticle;
    }

    public void setNomArticle(String nomArticle) {
        this.nomArticle = nomArticle;
    }

    public String getRayon() {
        return rayon;
    }

    public void setRayon(String rayon) {
        this.rayon = rayon;
    }

    public String getRayonnier() {
        return rayonnier;
    }

    public void setRayonnier(String rayonnier) {
        this.rayonnier = rayonnier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getPu() {
        return pu;
    }

    public void setPu(Double pu) {
        this.pu = pu;
    }

    public FamilleDTO getFamille() {
        return famille;
    }

    public void setFamille(FamilleDTO famille) {
        this.famille = famille;
    }

    public InventaireDTO getInventaire() {
        return inventaire;
    }

    public void setInventaire(InventaireDTO inventaire) {
        this.inventaire = inventaire;
    }

    public FournisseurDTO getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(FournisseurDTO fournisseur) {
        this.fournisseur = fournisseur;
    }

    public CommandeDTO getCommande() {
        return commande;
    }

    public void setCommande(CommandeDTO commande) {
        this.commande = commande;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArticleDTO)) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, articleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", idArticle=" + getIdArticle() +
            ", nomArticle='" + getNomArticle() + "'" +
            ", rayon='" + getRayon() + "'" +
            ", rayonnier='" + getRayonnier() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantite=" + getQuantite() +
            ", pu=" + getPu() +
            ", famille=" + getFamille() +
            ", inventaire=" + getInventaire() +
            ", fournisseur=" + getFournisseur() +
            ", commande=" + getCommande() +
            "}";
    }
}
