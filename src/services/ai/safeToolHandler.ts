type ToolSuccess<T> = { ok: true; data: T };
type ToolFailure = { ok: false; error: string; code?: number };

export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

/**
 * Wraps tool execution to ensure failures are normalized for AI flows.
 */
export async function safeToolHandler<T>(action: () => Promise<T>): Promise<ToolResult<T>> {
  try {
    const data = await action();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown tool error",
      code: 500,
    };
  }
}
