package com.tydic.common.file;

import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 
 * 文件搜索
 * 多线程并发搜索
 * @ClassName: FileSearch 
 * @author huanglinfeng@tydic.com
 * @date 2017年6月2日 下午12:24:03 
 *
 */
public class FileSearch {
	
	public enum MatchRule{
		prefix,suffix,contain,equals
	}

	/**
	 * 搜索根目录
	 */
	String searchRootDir;
	/**
	 * 文件名关键字
	 */
	String keyWord;
	/**
	 * 线程池
	 */
	ExecutorService threadPool;
	
	public FileSearch(ExecutorService threadPool,String searchRootDir,String keyWord){
		this.threadPool=threadPool;
		this.searchRootDir=searchRootDir;
		this.keyWord=keyWord;
	}
	
	public List<File> search(final MatchRule matchRule) throws Exception{
		List<File> files=new ArrayList<File>();
		
		File root=new File(searchRootDir);
		if(!root.exists()){
			return files;
		}
		final AtomicInteger dirCount=new AtomicInteger(0);
		File[] subFiles = root.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
            	if(pathname.isDirectory()){
            		dirCount.incrementAndGet();
            		return true;
            	}
            	
            	return isMeet(pathname, matchRule);
            }
        });
		
		if(subFiles==null){
			return files;
		}
		
		//使用future回收结果
		List<Future<List<File>>> futures=new ArrayList<Future<List<File>>>();
		for(File subFile : subFiles){
			if(subFile.isFile()){
				files.add(subFile);
			}else{
				futures.add(threadPool.submit(new SearchTask(subFile, matchRule)));
			}
		}
		
		for(Future<List<File>> future : futures){
			List<File> _fs=future.get();
			if(_fs==null || _fs.size()<=0){
				continue;
			}
			files.addAll(_fs);
		}
		
		return files;
	}
	
	class SearchTask implements Callable<List<File>>{
		private File rootDir;
		private MatchRule matchRule;
		private List<File> searchResult;
		
		public SearchTask(File rootDir,MatchRule matchRule) {
			this.rootDir=rootDir;
			this.matchRule=matchRule;
			searchResult=new ArrayList<File>();
		}
		
		@Override
		public List<File> call() throws Exception {
			search(rootDir,matchRule);
			return searchResult;
		}
		
		private void search(File _file,final MatchRule matchRule){
			if(_file.isDirectory()){
				File[] _subFiles=_file.listFiles(new FileFilter() {
		            @Override
		            public boolean accept(File pathname) {
		            	if(pathname.isDirectory()){
		            		return true;
		            	}
		            	
		            	return isMeet(pathname, matchRule);
		            }
		        });
				
				if(_subFiles!=null){
					for(File _subFile : _subFiles){
						search(_subFile,matchRule);
					}
				}
			}else{
				searchResult.add(_file);
			}
		}
		
	}  

	boolean isMeet(File pathname,MatchRule matchRule){
		switch (matchRule) {
		case prefix:
			if (pathname.getName().toLowerCase().startsWith(keyWord.toLowerCase())){
                return true;
            }
			break;
		case suffix:
			if (pathname.getName().toLowerCase().endsWith(keyWord.toLowerCase())){
                return true;
            }				
			break;
		case contain:
			if (pathname.getName().toLowerCase().contains(keyWord.toLowerCase())){
                return true;
            }
			break;
		case equals:
			if(pathname.getName().toLowerCase().equals(keyWord.toLowerCase())){
				return true;
			}
			break;
		default:
			break;
		}
    	
        return false;
	}
}
