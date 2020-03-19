/**
 * BillResVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.tydic.common.sendMessage.sx;

public class BillResVo  implements java.io.Serializable {
    private java.lang.String stateDesc;

    private java.lang.String[] errorFlowCode;

    private java.lang.String state;

    public BillResVo() {
    }

    public BillResVo(
           java.lang.String stateDesc,
           java.lang.String[] errorFlowCode,
           java.lang.String state) {
           this.stateDesc = stateDesc;
           this.errorFlowCode = errorFlowCode;
           this.state = state;
    }


    /**
     * Gets the stateDesc value for this BillResVo.
     * 
     * @return stateDesc
     */
    public java.lang.String getStateDesc() {
        return stateDesc;
    }


    /**
     * Sets the stateDesc value for this BillResVo.
     * 
     * @param stateDesc
     */
    public void setStateDesc(java.lang.String stateDesc) {
        this.stateDesc = stateDesc;
    }


    /**
     * Gets the errorFlowCode value for this BillResVo.
     * 
     * @return errorFlowCode
     */
    public java.lang.String[] getErrorFlowCode() {
        return errorFlowCode;
    }


    /**
     * Sets the errorFlowCode value for this BillResVo.
     * 
     * @param errorFlowCode
     */
    public void setErrorFlowCode(java.lang.String[] errorFlowCode) {
        this.errorFlowCode = errorFlowCode;
    }

    public java.lang.String getErrorFlowCode(int i) {
        return this.errorFlowCode[i];
    }

    public void setErrorFlowCode(int i, java.lang.String _value) {
        this.errorFlowCode[i] = _value;
    }


    /**
     * Gets the state value for this BillResVo.
     * 
     * @return state
     */
    public java.lang.String getState() {
        return state;
    }


    /**
     * Sets the state value for this BillResVo.
     * 
     * @param state
     */
    public void setState(java.lang.String state) {
        this.state = state;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof BillResVo)) return false;
        BillResVo other = (BillResVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.stateDesc==null && other.getStateDesc()==null) || 
             (this.stateDesc!=null &&
              this.stateDesc.equals(other.getStateDesc()))) &&
            ((this.errorFlowCode==null && other.getErrorFlowCode()==null) || 
             (this.errorFlowCode!=null &&
              java.util.Arrays.equals(this.errorFlowCode, other.getErrorFlowCode()))) &&
            ((this.state==null && other.getState()==null) || 
             (this.state!=null &&
              this.state.equals(other.getState())));
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
        if (getStateDesc() != null) {
            _hashCode += getStateDesc().hashCode();
        }
        if (getErrorFlowCode() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getErrorFlowCode());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getErrorFlowCode(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getState() != null) {
            _hashCode += getState().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(BillResVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "BillResVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("stateDesc");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "stateDesc"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("errorFlowCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "errorFlowCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("state");
        elemField.setXmlName(new javax.xml.namespace.QName("http://vo.intf.smpin.tydic.com", "state"));
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
