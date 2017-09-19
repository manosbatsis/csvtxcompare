package com.tutuka.manosbatsis.csvtxcompare.repository;

import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Typical repository interface for {@link MarkoffRecord} entities.
 * Implementation is automatically generated by Spring
 * Created by manos on 12/9/2017.
 */
@Repository
public interface MarkoffRecordRepository
		extends JpaRepository<MarkoffRecord, String>,
		JpaSpecificationExecutor<MarkoffRecord> {
}