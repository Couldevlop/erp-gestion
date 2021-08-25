package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.ArticleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring", uses = { FamilleMapper.class, InventaireMapper.class, FournisseurMapper.class, CommandeMapper.class })
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {
    @Mapping(target = "famille", source = "famille", qualifiedByName = "id")
    @Mapping(target = "inventaire", source = "inventaire", qualifiedByName = "nomArticle")
    @Mapping(target = "fournisseur", source = "fournisseur", qualifiedByName = "nomFournisseur")
    @Mapping(target = "commande", source = "commande", qualifiedByName = "description")
    ArticleDTO toDto(Article s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArticleDTO toDtoId(Article article);
}
