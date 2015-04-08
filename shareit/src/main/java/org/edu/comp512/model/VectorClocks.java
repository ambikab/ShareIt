package org.edu.comp512.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * Representation of vector clocks.
 * @author AMBIKA BABUJI
 *
 */

@XmlRootElement
public class VectorClocks {

	//represents the vector clock.
	@XmlElement
	Integer[] vector;

	public VectorClocks() {

	}

	/**
	 * 
	 */
	public VectorClocks(int size) {
		vector = new Integer[size];
	}

	/**
	 * 
	 * @param vector
	 */
	public VectorClocks(Integer[] vector) {
		super();
		this.vector = vector;
	}

	public Integer[] getVector() {
		return vector;
	}


	public void setVector(Integer[] vector) {
		this.vector = vector;
	}

	/**
	 * Return the vector size.
	 * @return
	 */
	@XmlTransient
	public int getVectorSize() {
		return this.vector.length;
	}

	/**
	 * Adds a new client's clock value to existing vector.
	 * @param clientId
	 * @param clockVal
	 */
	public void setClockVal(int clientId, int clockVal) {
		this.vector[clientId] = clockVal;
	}

	/**
	 * 
	 * @param clientId
	 * @return
	 */
	public int getClockVal(int clientId) {
		return this.vector[clientId];
	}

	/**
	 * 
	 * @param vector1
	 * @param vector2
	 * @return
	 */
	public int compareTo(VectorClocks vector1, VectorClocks vector2) {
		int keys = vector1.getVectorSize();
		boolean great = false, less = false;
		for (int i = 0; i <  keys; i++) {
			int val1 = vector1.getClockVal(i);
			int val2 = vector2.getClockVal(i);
			if (val1 > val2) great = true;
			if (val1 < val2) less = true;
		}
		if (great && less) return 2; //concurrent vectors
		if (great) return 1; //vector1 is greater than vector2.
		if (less) return -1; //vector2 is greater than vector1.
		return 0; //vector1 is equal to vector2.
	}

	/**
	 * 
	 * @param vector1
	 * @return
	 */
	public VectorClocks getMaxVector(VectorClocks vector1) {
		int size = vector1.getVectorSize();
		Integer[] maxMap = new Integer[size];
		for (int i = 0; i < size; i++) {
			int val1 = vector1.getClockVal(i);
			int val2 = this.getClockVal(i);
			int max = val1 > val2 ? val1 : val2;
			maxMap[i] = max;
		}
		return new VectorClocks(maxMap);
	}
}