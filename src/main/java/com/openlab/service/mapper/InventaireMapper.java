package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.InventaireDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Inventaire} and its DTO {@link InventaireDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InventaireMapper extends EntityMapper<InventaireDTO, Inventaire> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InventaireDTO toDtoId(Inventaire inventaire);
}
