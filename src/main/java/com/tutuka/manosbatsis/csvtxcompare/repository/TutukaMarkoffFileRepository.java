package com.tutuka.manosbatsis.csvtxcompare.repository;

import com.tutuka.manosbatsis.csvtxcompare.model.TutukaMarkoffFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Typical repository interface for {@link TutukaMarkoffFile} entities.
 * Implementation is automatically generated by Spring
 * Created by manos on 12/9/2017.
 */
@Repository
public interface TutukaMarkoffFileRepository
		extends JpaRepository<TutukaMarkoffFile, String>,
		JpaSpecificationExecutor<TutukaMarkoffFile> {
}