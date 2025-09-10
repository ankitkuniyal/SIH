import React, { useEffect, useState } from "react";

function ImageWithFallback({ src, alt, fallback, className = "", loading = "lazy", ...props }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when the src changes
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError) {
    return (
      <div className={`bg-muted/60 dark:bg-neutral-900/40 flex items-center justify-center ${className}`}>
        {fallback ? (
          fallback
        ) : (
          <div className="text-muted-foreground text-sm">
            {alt || "Image unavailable"}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`bg-muted animate-pulse ${className}`}
          role="status"
          aria-busy="true"
          aria-live="polite"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`${isLoading ? "hidden" : ""} ${className}`}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        {...props}
      />
    </>
  );
}

export default ImageWithFallback;
