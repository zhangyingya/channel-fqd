package com.tydic.common.utils;

import java.io.File;

public class FileUtil {

	/**
	 * 删除文件
	 * @param dir
	 * @return
	 */
	public static boolean deleteFile(File dir) {
		if (dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteFile(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		// 目录此时为空，可以删除
		return dir.delete();
	}
	
	/**
	 * 删除文件
	 * @param path
	 * @return
	 */
	public static boolean deleteFile(String path) {
		File dir = new File(path);
		if (dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteFile(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		// 目录此时为空，可以删除
		return dir.delete();
	}
	
	public static void createDir(String path) {
		File file = new File(path);
		if(!file.exists()) {
			file.mkdirs();
		}
	}
}
