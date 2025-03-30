import type * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  OTP: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  OTP,
}) => {
  // Split OTP into individual characters for better display, with fallback for undefined/null
  const otpDigits = OTP ? OTP.split("") : [];

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        color: "#333333",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
          borderBottom: "1px solid #eaeaea",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#093a12",
            marginBottom: "8px",
          }}
        >
          PALMS
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#6b7280",
          }}
        >
          Account Security
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#111827",
          }}
        >
          Hello, {firstName}!
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          We received a request to change the password for your account. To
          verify your identity, please use the following One-Time Password
          (OTP):
        </p>

        {/* OTP Display */}
        <div
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            padding: "16px",
            textAlign: "center",
            margin: "auto",
            marginBottom: "24px",
          }}
        >
          {OTP ? (
            <>
              <div
                style={{
                  display: "table",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {otpDigits.map((digit, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#093a12",
                        minWidth: "24px",
                        textAlign: "center",
                      }}
                    >
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0",
                }}
              >
                This code will expire in 10 minutes
              </p>
            </>
          ) : (
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#ef4444",
              }}
            >
              OTP code not available
            </p>
          )}
        </div>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          If you didn&apos;t request a password change, please ignore this email
          or contact our support team immediately if you believe your account
          may be compromised.
        </p>

        <div
          style={{
            backgroundColor: "#fffbeb",
            borderLeft: "4px solid #f59e0b",
            padding: "12px 16px",
            marginBottom: "24px",
            borderRadius: "4px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              margin: "0",
              color: "#92400e",
            }}
          >
            <strong>Security Tip:</strong> We will never ask for your password
            or OTP via email, phone, or SMS. Never share your OTP with anyone.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #eaeaea",
          paddingTop: "20px",
          fontSize: "14px",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 12px 0" }}>
          © {new Date().getFullYear()} PALMS. All rights reserved.
        </p>
        <p style={{ margin: "0", fontSize: "12px" }}>
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    </div>
  );
};
