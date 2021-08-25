package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.FournisseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Fournisseur} and its DTO {@link FournisseurDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {
    @Named("nomFournisseur")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomFournisseur", source = "nomFournisseur")
    FournisseurDTO toDtoNomFournisseur(Fournisseur fournisseur);
}
