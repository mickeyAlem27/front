import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WebView Image Picker',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final ImagePicker _picker = ImagePicker();
  late WebViewController _controller;
  // Define selectedUserId to replace selectedUser._id
  String selectedUserId = 'default_user_id'; // Replace with actual user ID logic
  // Define the backend URL (replace with your actual backend URL)
  final String backendUrl = 'https://back-3ita.onrender.com';

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'flutterImagePicker',
        onMessageReceived: (JavaScriptMessage message) {
          print('JavaScript message received: ${message.message}');
          if (message.message == 'pickImage') {
            _pickAndUploadImage();
          }
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            // Inject JavaScript to override button click
            _controller.runJavaScript('''
              document.getElementById('your-button-id').addEventListener('click', () => {
                window.flutterImagePicker.postMessage('pickImage');
              });
            ''');
          },
        ),
      )
      ..loadRequest(Uri.parse('https://front-u22f.onrender.com/'));
  }

  Future<void> _pickAndUploadImage() async {
    try {
      final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
      if (image != null) {
        // Send as raw bytes
        final bytes = await image.readAsBytes();
        final response = await http.post(
          Uri.parse('$backendUrl/api/messages/send/$selectedUserId'),
          body: bytes,
          headers: {'Content-Type': 'image/jpeg'},
        );

        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Image uploaded successfully')),
          );
          _controller.runJavaScript('alert("Image uploaded successfully")');
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
                content:
                    Text('Failed to upload image: ${response.statusCode}')),
          );
          _controller.runJavaScript('alert("Failed to upload image")');
        }
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
      _controller.runJavaScript('alert("Error: $e")');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('WebView Image Picker'),
      ),
      body: WebViewWidget(controller: _controller),
    );
  }
}