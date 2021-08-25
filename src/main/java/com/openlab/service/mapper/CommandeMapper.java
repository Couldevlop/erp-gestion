package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.CommandeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Commande} and its DTO {@link CommandeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CommandeMapper extends EntityMapper<CommandeDTO, Commande> {
    @Named("description")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    CommandeDTO toDtoDescription(Commande commande);
}
