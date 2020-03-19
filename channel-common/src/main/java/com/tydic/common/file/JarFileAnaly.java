package com.tydic.common.file;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.Manifest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * jar包信息解析
 * @ClassName: JarFileAnaly 
 * @author huanglinfeng@tydic.com
 * @date 2017年6月2日 下午1:52:20 
 *
 */
public class JarFileAnaly {
	
	public final static String[] VERSION_KEY_ARR=new String[]{"Bundle-Version","Implementation-Version"};
	public final static String[] NAME_KEY_ARR=new String[]{"Bundle-Name","Implementation-Title"};
	public final static String[] VENDOR_KEY_ARR=new String[]{"Bundle-Vendor","Implementation-Vendor"};

	public static JarInfo analy(String path)throws Exception{
		JarInfo jarInfo=new JarInfo();
		JarFile jarFile=null;
		Manifest manifest=null;
		try {
			jarFile=new JarFile(new File(path));
			manifest = jarFile.getManifest();
			jarInfo.setFullName(jarFile.getName().substring(jarFile.getName().lastIndexOf(File.separator)+1));
		} catch (IOException e) {
			throw e;
		} finally{
			if(jarFile!=null){
				jarFile.close();
			}
		}
		
		jarInfo.setAbsolutePath(path);
		if(manifest==null){
			return jarInfo;
		}
		
		Attributes attrs=manifest.getMainAttributes();
		Iterator<Object> i=attrs.keySet().iterator();
		while(i.hasNext()){
			Attributes.Name name=(Attributes.Name)i.next();
			
			if(jarInfo.getName()==null &&
					Arrays.asList(NAME_KEY_ARR).contains(name.toString())){
				jarInfo.setName(attrs.getValue(name));
			}
			
			if(jarInfo.getVendor()==null &&
					Arrays.asList(VENDOR_KEY_ARR).contains(name.toString())){
				jarInfo.setVendor(attrs.getValue(name));
			}
			
			if(jarInfo.getVersion()==null &&
					Arrays.asList(VERSION_KEY_ARR).contains(name.toString())){
				jarInfo.setVersion(attrs.getValue(name));
			}
		}
		
		//二次处理，如果通过Manifest中无法获取名称和版本信息，则从jar包名字中截取
		againManage(jarInfo);
		
		return jarInfo;
	}
	
	private static void againManage(JarInfo jarInfo){
		Pattern p = Pattern.compile("\\d");
		if(jarInfo.getName()==null){
			if(!jarInfo.getFullName().contains("-")){
				jarInfo.setName(jarInfo.getFullName().substring(0,jarInfo.getFullName().lastIndexOf(".")));
			}else{
				String _str=jarInfo.getFullName().substring(jarInfo.getFullName().lastIndexOf("-")+1).replace(".jar", "");
				Matcher m = p.matcher(_str);
				if(m.find()){
					jarInfo.setName(jarInfo.getFullName().substring(0,jarInfo.getFullName().lastIndexOf("-")));
				}else{
					jarInfo.setName(jarInfo.getFullName().substring(0,jarInfo.getFullName().lastIndexOf(".")));
				}
			}
		}
		
		if(jarInfo.getVersion()==null){
			if(jarInfo.getFullName().contains("-")){
				String _str=jarInfo.getFullName().substring(jarInfo.getFullName().lastIndexOf("-")+1).replace(".jar", "");
				Matcher m = p.matcher(_str);
				if(m.find()){
					jarInfo.setVersion(_str);
				}
			}
		}
	}
	
}
