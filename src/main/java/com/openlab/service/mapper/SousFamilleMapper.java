package com.openlab.service.mapper;

import com.openlab.domain.*;
import com.openlab.service.dto.SousFamilleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SousFamille} and its DTO {@link SousFamilleDTO}.
 */
@Mapper(componentModel = "spring", uses = { FamilleMapper.class })
public interface SousFamilleMapper extends EntityMapper<SousFamilleDTO, SousFamille> {
    @Mapping(target = "famille", source = "famille", qualifiedByName = "id")
    SousFamilleDTO toDto(SousFamille s);
}
