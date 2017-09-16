package com.tutuka.manosbatsis.csvtxcompare.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * Created by manos on 12/9/2017.
 */
@Entity
@Getter
@Setter
@EqualsAndHashCode(exclude = {"clientMarkoff", "tutukaMarkoff"})
@NoArgsConstructor
@AllArgsConstructor
public class MarkoffFilesComparison {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	private String id;

	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@ApiModelProperty(value = "Date created", readOnly = true)
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdDate = LocalDateTime.now();

	@OneToOne(mappedBy = "markoffFilesComparison")
	private ClientMarkoffFile clientMarkoff;

	@OneToOne(mappedBy = "markoffFilesComparison")
	private TutukaMarkoffFile tutukaMarkoff;

}
