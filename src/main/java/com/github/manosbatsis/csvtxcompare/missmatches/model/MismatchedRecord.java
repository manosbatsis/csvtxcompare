package com.github.manosbatsis.csvtxcompare.missmatches.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

/**
 * Created by manos on 11/9/2017.
 */
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MismatchedRecord {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	private String id;

	private String transactionID;

	private String profileName;

	private Date transactionDate;

	private String transactionNarrative;

	private String transactionDescription;

	private String transactionType;

	private String walletReference;

	private BigDecimal transactionAmount;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(updatable = false)
	private MarkoffFile markoffFile;
}
