"use client";

import { useEffect } from "react";
declare global {
  interface Window {
    chatwootSDK?: any;
  }
}
export default function ChatwootWidget() {
  useEffect(() => {
    console.log('ChatwootWidget: Initializing...');
    
    // Ensure we're in browser environment
    if (typeof window === 'undefined') {
      console.log('ChatwootWidget: Not in browser environment, skipping');
      return;
    }
    
    // Check if script already loaded

    
    (function(d, t) {
      const BASE_URL = "http://10.30.10.4:3000";
      const g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      (g as HTMLScriptElement).src = BASE_URL + "/packs/js/sdk.js";
      (g as HTMLScriptElement).async = true;
      (g as HTMLScriptElement).defer = true;
      
      g.onerror = function() {
        console.error('ChatwootWidget: Failed to load SDK script');
      };
      
      s.parentNode?.insertBefore(g, s);
      
      g.onload = function() {
        console.log('ChatwootWidget: SDK script loaded successfully');
        
        // Wait a bit for SDK to be ready
        setTimeout(() => {
          try {
            if ((window).chatwootSDK) {
              (window).chatwootSDK.run({
                websiteToken: "KBtYvnuxpLZp9XeDNZZv28sN",
                baseUrl: BASE_URL,
                position: 'right',
                type: 'standard',
                launcherTitle: 'Chat với chúng tôi'
              });
              console.log('ChatwootWidget: SDK initialized successfully');
            } else {
              console.error('ChatwootWidget: chatwootSDK not available after script load');
            }
          } catch (error) {
            console.error('ChatwootWidget: Error initializing SDK:', error);
          }
        }, 100);
      };
    })(document, "script");
   }, []);

  return null;
}
