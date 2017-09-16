package com.tutuka.manosbatsis.csvtxcompare.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
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
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.GenericGenerator;

/**
 * Created by manos on 11/9/2017.
 */
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarkoffRecord {

	public static final String RECORD_COMMENT = "recordComment";

	public static final String RECORD_NUMBER = "recordNumber";

	public static final String PROFILE_NAME = "ProfileName";

	public static final String TRANSACTION_AMOUNT = "TransactionAmount";

	public static final String TRANSACTION_DATE = "TransactionDate";

	public static final String TRANSACTION_NARRATIVE = "TransactionNarrative";

	public static final String TRANSACTION_DESCRIPTION = "TransactionDescription";

	public static final String TRANSACTION_ID = "TransactionID";

	public static final String TRANSACTION_TYPE = "TransactionType";

	public static final String WALLET_REFERENCE = "WalletReference";

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	private String id;

	@Column(nullable = false, updatable = false)
	private Long recordNumber;

	private String recordComment;

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


	/**
	 * Used to find mismatched records between markoffs. Id, markoffFile, recordNumber and recordComment are ignored.
	 * @see #hashCode()
	 * @see Object#equals(Object)
	 * @see EqualsBuilder
	 */
	@Override
	public boolean equals(Object obj) {
		if (obj == null) { return false; }
		if (obj == this) { return true; }
		if (!MarkoffRecord.class.isAssignableFrom(obj.getClass())) {
			return false;
		}
		MarkoffRecord rhs = (MarkoffRecord) obj;
		return new EqualsBuilder()
				.append(transactionID, rhs.transactionID)
				.append(profileName, rhs.profileName)
				.append(transactionDate, rhs.transactionDate)
				.append(transactionNarrative, rhs.transactionNarrative)
				.append(transactionDescription, rhs.transactionDescription)
				.append(transactionType, rhs.transactionType)
				.append(walletReference, rhs.walletReference)
				.append(transactionAmount, rhs.transactionAmount)
				.isEquals();
	}

	/**
	 * Completes out {@link Object#equals(Object)}/{@link Object#hashCode()} contract
	 * @see #equals(Object)
	 * @see Object#hashCode()
	 * @see HashCodeBuilder
	 */
	@Override
	public int hashCode() {
		// you pick a hard-coded, randomly chosen, non-zero, odd number
		// ideally different for each class
		return new HashCodeBuilder(107, 307)
				.append(transactionID)
				.append(profileName)
				.append(transactionDate)
				.append(transactionNarrative)
				.append(transactionDescription)
				.append(transactionType)
				.append(walletReference)
				.append(transactionAmount)
				.toHashCode();
	}
}
