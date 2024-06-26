import React, { Component, useState } from 'react';
import { Alert, View, Button, Text } from 'react-native';
import { Tester, TestCase, TestSuite } from "@rnoh/testerino"
import TouchID from 'react-native-touch-id';

export function HarmonyTouchId() {
  const [result, setResult] = useState<string>('')
  return (
    <Tester>
      <Text style={{height:40,backgroundColor:'white',textAlign:'center'}}>{result}</Text>
      <TestSuite name='TouchID'>
        <TestCase
          itShould="isSupported( use unified error messages (default false) )"
          tags={['C_API']}
          initialState={false}
          arrange={({ setState }) => {
            return (
              <Button title='验证是否有指纹权限'
                  onPress={() => {
                    TouchID.isSupported({ unifiedErrors: false }).then((res: any) => {
                      setState(true)
                      setResult(res)
                    }).catch((err: any) => {
                      setState(true)
                      setResult(err.message)
                    })
                  }}
                ></Button>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(state).to.be.eq(true);
          }}
        />
         <TestCase
          itShould="isSupported( use unified error messages (true) )"
          tags={['C_API']}
          initialState={false}
          arrange={({ setState }) => {
            return (
              <Button title='验证是否有指纹权限'
                  onPress={() => {
                    TouchID.isSupported({ unifiedErrors: true }).then((res: any) => {
                      setState(true)
                      setResult(res)
                    }).catch((err: any) => {
                      setState(true)
                      setResult(err.message)
                    })
                  }}
                ></Button>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(state).to.be.eq(true);
          }}
        />
        <TestCase
          itShould="authenticate( default )"
          tags={['C_API']}
          initialState={false}
          arrange={({ setState }) => {
            return (
              <Button title='校验指纹'
                onPress={() => {
                  TouchID.authenticate().then((res: boolean) => {
                    setState(true)
                    setResult('认证成功')
                  }).catch((err: any) => {
                    setState(true)
                    setResult(err.message)
                  })
                }}
              ></Button>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(state).to.be.eq(true);
          }}
        />
           <TestCase
          itShould="authenticate( title of confirmation dialog)"
          tags={['C_API']}
          initialState={false}
          arrange={({ setState }) => {
            return (
              <Button title='校验指纹'
                onPress={() => {
                  TouchID.authenticate("请输入密码").then((res: boolean) => {
                    setState(true)
                    setResult('认证成功')
                  }).catch((err: any) => {
                    setState(true)
                    setResult(err.message)
                  })
                }}
              ></Button>
            );
          }}
          assert={async ({ expect, state }) => {
            expect(state).to.be.eq(true);
          }}
        />
      </TestSuite>
    </Tester>
  )
}