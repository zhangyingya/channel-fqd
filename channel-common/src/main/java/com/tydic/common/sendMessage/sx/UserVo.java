/**
 * UserVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.tydic.common.sendMessage.sx;

public class UserVo  implements java.io.Serializable {
    private java.lang.String userName;

    private java.lang.String passWord;

    private java.lang.String sysCode;

    private java.lang.String productId;

    public UserVo() {
    }

    public UserVo(
           java.lang.String userName,
           java.lang.String passWord,
           java.lang.String sysCode,
           java.lang.String productId) {
           this.userName = userName;
           this.passWord = passWord;
           this.sysCode = sysCode;
           this.productId = productId;
    }


    /**
     * Gets the userName value for this UserVo.
     * 
     * @return userName
     */
    public java.lang.String getUserName() {
        return userName;
    }


    /**
     * Sets the userName value for this UserVo.
     * 
     * @param userName
     */
    public void setUserName(java.lang.String userName) {
        this.userName = userName;
    }


    /**
     * Gets the passWord value for this UserVo.
     * 
     * @return passWord
     */
    public java.lang.String getPassWord() {
        return passWord;
    }


    /**
     * Sets the passWord value for this UserVo.
     * 
     * @param passWord
     */
    public void setPassWord(java.lang.String passWord) {
        this.passWord = passWord;
    }


    /**
     * Gets the sysCode value for this UserVo.
     * 
     * @return sysCode
     */
    public java.lang.String getSysCode() {
        return sysCode;
    }


    /**
     * Sets the sysCode value for this UserVo.
     * 
     * @param sysCode
     */
    public void setSysCode(java.lang.String sysCode) {
        this.sysCode = sysCode;
    }


    /**
     * Gets the productId value for this UserVo.
     * 
     * @return productId
     */
    public java.lang.String getProductId() {
        return productId;
    }


    /**
     * Sets the productId value for this UserVo.
     * 
     * @param productId
     */
    public void setProductId(java.lang.String productId) {
        this.productId = productId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof UserVo)) return false;
        UserVo other = (UserVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.userName==null && other.getUserName()==null) || 
             (this.userName!=null &&
              this.userName.equals(other.getUserName()))) &&
            ((this.passWord==null && other.getPassWord()==null) || 
             (this.passWord!=null &&
              this.passWord.equals(other.getPassWord()))) &&
            ((this.sysCode==null && other.getSysCode()==null) || 
             (this.sysCode!=null &&
              this.sysCode.equals(other.getSysCode()))) &&
            ((this.productId==null && other.getProductId()==null) || 
             (this.productId!=null &&
              this.productId.equals(other.getProductId())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getUserName() != null) {
            _hashCode += getUserName().hashCode();
        }
        if (getPassWord() != null) {
            _hashCode += getPassWord().hashCode();
        }
        if (getSysCode() != null) {
            _hashCode += getSysCode().hashCode();
        }
        if (getProductId() != null) {
            _hashCode += getProductId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "UserVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("userName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "userName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("passWord");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "passWord"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sysCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "sysCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("productId");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "productId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
