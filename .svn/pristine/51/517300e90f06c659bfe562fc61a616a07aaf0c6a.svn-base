package com.tydic.common.file;

import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

public class FileSearch2 extends FileSearch{
	
	private final List<File> files;
	private final AtomicInteger count=new AtomicInteger();
	
	public FileSearch2(ExecutorService threadPool,String searchRootDir,String keyWord){
		super(threadPool,searchRootDir,keyWord);
		files=Collections.synchronizedList(new ArrayList<File>());
	}
	
	@Override
	public List<File> search(final MatchRule matchRule) throws Exception{
		File root=new File(searchRootDir);
		if(!root.exists() || root.isFile()){
			return files;
		}
		
		threadPool.submit(new SearchRunnable(root, matchRule));
		count.incrementAndGet();
		
		final CountDownLatch cwl=new CountDownLatch(1);
		threadPool.submit(new Runnable() {
			@Override
			public void run() {
				while(true){
					if(count.intValue()==0){
						cwl.countDown();
						break;
					}
				}
			}
		});
		cwl.await();
		
		return files;
	}
	
	class SearchRunnable implements Runnable{
		private File rootDir;
		private MatchRule matchRule;
		
		public SearchRunnable(File rootDir,MatchRule matchRule) {
			this.rootDir=rootDir;
			this.matchRule=matchRule;
		}
		
		@Override
		public void run() {
			search(rootDir,matchRule);
			count.decrementAndGet();
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
						threadPool.submit(new SearchRunnable(_subFile, matchRule));
						count.incrementAndGet();
					}
				}
			}else{
				files.add(_file);
			}
		}
	}  
}
