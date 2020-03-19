package com.tydic.common.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;


public class ListSplitUtil {

	
	
	/**
     * 按指定大小，分隔集合，将集合按规定个数分为n个部分
     * @param <T>
     * 
     * @param list
     * @param len
     * @return
     */
    @SuppressWarnings("unchecked")
	public static <T> List<List<Map<String, Object>>> splitList(List<T> list, int len) {
        
        if (list == null || list.isEmpty() || len < 1) {
            return Collections.emptyList();
        }

        List<List<Map<String, Object>>> result = new ArrayList<List<Map<String, Object>>>();

        int size = list.size();
        int count = (size + len - 1) / len;

        for (int i = 0; i < count; i++) {
            List<Map<String, Object>> subList = (List<Map<String, Object>>) list.subList(i * len, ((i + 1) * len > size ? size : len * (i + 1)));
            result.add(subList);
        }
        
        return result;
    }
	
	/**
	 * @desc 将list分割成多个list，每个list长度为length
	 * @param list
	 * @param length
	 * @return
	 */
//	public static <T> List<List<T>> split(List<T> list,final Integer length){
//		
//		int limit = countStep(list.size(),length);
//		List<List<T>> mglist = new ArrayList<>();
//		
//	    Stream.iterate(0, n -> n + 1).limit(limit).forEach(i -> {
//	        mglist.add(list.stream().skip(i * limit).limit(limit).collect(Collectors.toList()));
//	    });
//		
//		return mglist;
//	}
	
	
	/**
	* 计算切分次数
	*/
	@SuppressWarnings("unused")
	private static Integer countStep(Integer size,Integer length) {
		return (size + length - 1) / length;
	}
}
