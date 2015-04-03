package org.edu.comp512.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Representation of vector clocks.
 * @author AMBIKA BABUJI
 *
 */
public class VectorClocks {

	//represents the vector clock.
	HashMap<String, Integer> vector;

	/**
	 * 
	 */
	public VectorClocks() {
		vector = new HashMap<String, Integer>();
	}

	/**
	 * 
	 * @param vector
	 */
	public VectorClocks(HashMap<String, Integer> vector) {
		super();
		this.vector = vector;
	}

	/**
	 * Adds a new client's clock value to existing vector.
	 * @param clientId
	 * @param clockVal
	 */
	public void setClockVal(String clientId, int clockVal) {
		this.vector.put(clientId, clockVal);
	}

	/**
	 * 
	 * @param clientId
	 * @return
	 */
	public int getClockVal(String clientId) {
		return this.vector.get(clientId);
	}

	/**
	 * 
	 * @param vector1
	 * @param vector2
	 * @return
	 */
	public int compareTo(VectorClocks vector1, VectorClocks vector2) {
		Set<String> keys1 = mergeKeys(vector1.vector.keySet(), vector2.vector.keySet());
		boolean great = false, less = false;
		for (String clientId : keys1) {
			int val1 = vector1.vector.containsKey(clientId) ? vector1.vector.get(clientId) : 0;
			int val2 = vector2.vector.containsKey(clientId) ? vector2.vector.get(clientId) : 0;
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
		Set<String> keys1 = mergeKeys(vector1.vector.keySet(), this.vector.keySet());
		HashMap<String, Integer> maxMap = new HashMap<String, Integer>();
		for (String clientId : keys1) {
			int val1 = vector1.vector.containsKey(clientId) ? vector1.vector.get(clientId) : 0;
			int val2 = this.vector.containsKey(clientId) ? this.vector.get(clientId) : 0;
			int max = val1 > val2 ? val1 : val2;
			maxMap.put(clientId, max);
		}
		return new VectorClocks(maxMap);
	}
	
	/**
	 * 
	 * @param keySet1
	 * @param keySet2
	 * @return
	 */
	public static Set<String> mergeKeys(Set<String> keySet1, Set<String> keySet2) {
		Set<String> keySet = new HashSet<String>();
		for (String key : keySet1) keySet.add(key);
		for (String key : keySet2) keySet.add(key);
		return keySet;
	}
}