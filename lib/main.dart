import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:login/firebase_options.dart';
import 'package:login/open.dart';
import 'package:login/verify.dart';

import 'home.dart';
import 'login.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(
    MaterialApp(
      initialRoute: 'opening',
      debugShowCheckedModeBanner: false,
      routes: {
        'opening':(context)=>Opening(),
        'login':(context)=>Login(),
        'home':(context)=>Home(),
        'verify':(context)=>Verify(),
      },
    )
  );
}


