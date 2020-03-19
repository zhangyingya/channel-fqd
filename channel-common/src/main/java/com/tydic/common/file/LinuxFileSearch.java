package com.tydic.common.file;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.tydic.common.utils.OsCharsetUtil;
import com.tydic.common.utils.RuntimeUtil;

public class LinuxFileSearch extends FileSearch{

	public LinuxFileSearch(String searchRootDir, String keyWord) {
		super(null, searchRootDir, keyWord);
	}

	@Override
	public List<File> search(MatchRule matchRule) throws Exception {
		List<File> files=new ArrayList<File>();
		if(searchRootDir==null || !new File(searchRootDir).exists()){
			return files;
		}
		
		StringBuilder cmd=new StringBuilder();
		cmd.append("find ");
		cmd.append(searchRootDir);
		cmd.append(" -name ");
		switch (matchRule) {
		case prefix:
			cmd.append(keyWord);
			cmd.append("*");
			break;
		case suffix:
			cmd.append("*");
			cmd.append(keyWord);
			break;
		case contain:
			cmd.append("*");
			cmd.append(keyWord);
			cmd.append("*");
			break;
		case equals:
			cmd.append(keyWord);
			break;
		}
		
		List<List<String>> result=RuntimeUtil.run(cmd.toString(),OsCharsetUtil.getLinuxCharsetName());
		List<String> successResult=result.get(0);
		for(String str : successResult){
			File file=new File(str);
			if(!file.exists()){
				continue;
			}
			files.add(file);
		}
		
		return files;
	}

}
