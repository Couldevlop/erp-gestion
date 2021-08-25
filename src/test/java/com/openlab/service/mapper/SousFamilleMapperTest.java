package com.openlab.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SousFamilleMapperTest {

    private SousFamilleMapper sousFamilleMapper;

    @BeforeEach
    public void setUp() {
        sousFamilleMapper = new SousFamilleMapperImpl();
    }
}
