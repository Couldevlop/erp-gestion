package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.FamilleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Famille} and its DTO {@link FamilleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FamilleMapper extends EntityMapper<FamilleDTO, Famille> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FamilleDTO toDtoId(Famille famille);
}
