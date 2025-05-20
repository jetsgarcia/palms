import type * as React from "react";

interface PasswordEmailTemplateProps {
  firstName: string;
  password: string;
}

export const PasswordEmailTemplate: React.FC<
  Readonly<PasswordEmailTemplateProps>
> = ({ firstName, password }) => {
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
          Account Registration
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
          Welcome, {firstName}!
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Your account has been successfully created by the administrator. Below
          is your temporary password:
        </p>

        {/* Password Display */}
        <div
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            padding: "16px",
            textAlign: "center",
            margin: "auto",
            marginBottom: "24px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#093a12",
            letterSpacing: "2px",
          }}
        >
          {password}
        </div>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Please log in using this password. A prompt will appear asking you to
          change your password. Make sure to choose a strong password that you
          can remember. If you have any questions or need assistance, feel free
          to reach out to our support team.
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
            <strong>Security Tip:</strong> Do not share your password with
            anyone. Change your password regularly.
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
