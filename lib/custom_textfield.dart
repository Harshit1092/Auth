import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget{
  final TextEditingController controller;
  final String hintText;
  final int maxLines;
  const CustomTextField({
    required this.controller,
    required this.hintText,
    this.maxLines=1,
  });
  Widget build(BuildContext context){
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
          hintText: hintText,
          border: OutlineInputBorder(
              borderSide: BorderSide(
                  color: Colors.black38
              ),
            borderRadius: BorderRadius.circular(10),
          ),
          enabledBorder:  OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black38,
              width: 0.5,
            ),
            borderRadius: BorderRadius.circular(10),
          )
      ),
      validator: (val){
        if(val==null||val.isEmpty){
          return 'Enter your $hintText';
        }
        return null;
      },
      maxLines: maxLines,
    );
  }
}