package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.CategorieDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Categorie} and its DTO {@link CategorieDTO}.
 */
@Mapper(componentModel = "spring", uses = { ArticleMapper.class })
public interface CategorieMapper extends EntityMapper<CategorieDTO, Categorie> {
    @Mapping(target = "article", source = "article", qualifiedByName = "id")
    CategorieDTO toDto(Categorie s);
}
