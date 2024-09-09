import React, { useCallback, useState } from "react";
import { TestSuite, Tester, TestCase } from "@rnoh/testerino";
import { View, Button, ScrollView, Text, StyleSheet } from "react-native";
import sensitive from "react-native-sensitive-info";

export function SensitiveInfo() {
  const [resTest, setResTest] = useState("");
  const handleSetItem = useCallback((key: string, value: string) => {
    sensitive.setItem(key, value, {
      sharedPreferencesName: "exampleApp",
      keychainService: "exampleApp",
    });
    if (key == "key1") {
      setResTest("存入键值对key1");
    } else {
      setResTest("存入键值对key2");
    }
  }, []);

  const handleGetItem = useCallback((key: string) => {
    sensitive
      .getItem(key, {
        sharedPreferencesName: "exampleApp",
        keychainService: "exampleApp",
      })
      .then((res) => {
        setResTest(res);
      });
  }, []);

  const handleDelItem = useCallback((value: string) => {
    sensitive.deleteItem(value, {
      sharedPreferencesName: "exampleApp",
      keychainService: "exampleApp",
    });
    setResTest("删除" + value);
  }, []);

  const handleGetAllItems = useCallback(() => {
    sensitive
      .getAllItems({
        sharedPreferencesName: "exampleApp",
        keychainService: "exampleApp",
      })
      .then((res) => {
        setResTest(JSON.stringify(res));
      });
  }, []);

  const handleHasEnrolledFingerprints = useCallback(() => {
    sensitive.hasEnrolledFingerprints().then((res) => {
      if (res) {
        setResTest("true");
      } else {
        setResTest("false");
      }
    });
  }, []);

  const handleIsSensorAvailable = useCallback(() => {
    sensitive.isSensorAvailable().then((res) => {
      if (res.result == "12500000") {
        setResTest("成功获取指纹权限");
      } else {
        setResTest("获取指纹权限失败");
      }
    });
  }, []);

  const handlecancelFingerprintAuth = useCallback(() => {
    try {
      sensitive.cancelFingerprintAuth();
      setResTest("成功取消指纹认证");
    } catch {
      setResTest("error");
    }
  }, []);

  const invalidatedByBiometricEnrollment = useCallback((set: boolean) => {
    try {
      sensitive.setInvalidatedByBiometricEnrollment(set);
      setResTest(set ? "成功关闭指纹权限" : "成功打开指纹权限");
    } catch {
      setResTest("关闭指纹权限失败");
    }
  }, []);

  return (
    <Tester style={{ height: "100%" }}>
      <View style={styles.content}>
        <Text style={styles.contentTest}>{resTest}</Text>
      </View>
      <ScrollView style={{ marginTop: 40 }}>
        <TestSuite name="SensitiveInfoDemo">
          <TestCase
            itShould="存入键值对key:key1 value:value1"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleSetItem("key1", "value1");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using setItem"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="存入键值对key:key2 value:value2"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleSetItem("key2", "value2");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using setItem"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="取出键值对value1"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleGetItem("key1");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using getItem"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="取出键值对value2"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleGetItem("key2");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using getItem"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="删除'key1'"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleDelItem("key1");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using deleteItem key1"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="删除'key2'"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleDelItem("key2");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using deleteItem key2"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="获取全部键值对"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleGetAllItems();
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using handleGetAllItems"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="判断指纹解锁是否可用"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleHasEnrolledFingerprints();
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using handleHasEnrolledFingerprints"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="获取指纹解锁权限"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await handleIsSensorAvailable();
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"Add item using handleIsSensorAvailable"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="取消指纹认证"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={() => {
                  try {
                    handlecancelFingerprintAuth();
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"handlecancelFingerprintAuth"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="关闭指纹权限(true)"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await invalidatedByBiometricEnrollment(true);
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"setInvalidatedByBiometricEnrollment"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="打开指纹权限(false)"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    await invalidatedByBiometricEnrollment(false);
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"setInvalidatedByBiometricEnrollment"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />

          <TestCase
            itShould="sharedPreferencesName"
            tags={["dev"]}
            initialState={false}
            arrange={({ setState }) => (
              <Button
                onPress={async () => {
                  try {
                    setResTest("true");
                    setState(true);
                  } catch {
                    setState(false);
                  }
                }}
                title={"sharedPreferencesName"}
              ></Button>
            )}
            assert={({ expect, state }) => {
              expect(state).to.be.eq(true);
            }}
          />
        </TestSuite>
      </ScrollView>
    </Tester>
  );
}
const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 50,
    width: "100%",
    height: "auto",
    zIndex: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentTest: {
    marginTop: 10,
    marginLeft: 10,
  },
});
