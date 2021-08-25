package com.openlab.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_commande")
    private Long idCommande;

    @Column(name = "qte")
    private String qte;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "commande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "famille", "categories", "inventaire", "fournisseur", "commande" }, allowSetters = true)
    private Set<Article> commandeArticles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Commande id(Long id) {
        this.id = id;
        return this;
    }

    public Long getIdCommande() {
        return this.idCommande;
    }

    public Commande idCommande(Long idCommande) {
        this.idCommande = idCommande;
        return this;
    }

    public void setIdCommande(Long idCommande) {
        this.idCommande = idCommande;
    }

    public String getQte() {
        return this.qte;
    }

    public Commande qte(String qte) {
        this.qte = qte;
        return this;
    }

    public void setQte(String qte) {
        this.qte = qte;
    }

    public String getDescription() {
        return this.description;
    }

    public Commande description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Article> getCommandeArticles() {
        return this.commandeArticles;
    }

    public Commande commandeArticles(Set<Article> articles) {
        this.setCommandeArticles(articles);
        return this;
    }

    public Commande addCommandeArticle(Article article) {
        this.commandeArticles.add(article);
        article.setCommande(this);
        return this;
    }

    public Commande removeCommandeArticle(Article article) {
        this.commandeArticles.remove(article);
        article.setCommande(null);
        return this;
    }

    public void setCommandeArticles(Set<Article> articles) {
        if (this.commandeArticles != null) {
            this.commandeArticles.forEach(i -> i.setCommande(null));
        }
        if (articles != null) {
            articles.forEach(i -> i.setCommande(this));
        }
        this.commandeArticles = articles;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", idCommande=" + getIdCommande() +
            ", qte='" + getQte() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
