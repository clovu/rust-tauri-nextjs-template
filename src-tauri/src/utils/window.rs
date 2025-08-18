use tauri::WebviewWindow;

pub trait WebviewWindowExt {
    /// This function can only be used in the main thread.
    #[cfg(target_os = "macos")]
    fn to_native_window(&self);
}

impl WebviewWindowExt for WebviewWindow {
    #[cfg(target_os = "macos")]
    fn to_native_window(&self) {
        use objc2::{MainThreadMarker, MainThreadOnly, rc::Retained};
        use objc2_app_kit::{NSToolbar, NSWindow};

        let ns_window = match self
            .ns_window()
            .ok()
            // I hope to be able to automatically dereference!! e.g. val.fn() v (*val).fn() x
            .and_then(|ptr| unsafe { Retained::retain(ptr as *mut NSWindow) })
        {
            Some(r) => r,
            None => return,
        };

        unsafe {
            // use objc2_app_kit::NSWindowToolbarStyle;

            let mtm = MainThreadMarker::new_unchecked();
            let ns_toolbar = NSToolbar::init(NSToolbar::alloc(mtm));
            ns_window.setToolbar(Some(&ns_toolbar));
            // ns_window.setToolbarStyle(NSWindowToolbarStyle::UnifiedCompact);
        }
    }
}
